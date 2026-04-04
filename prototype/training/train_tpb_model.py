"""
Fine-tune DistilBERT for TPB construct classification
Trains separate models for each construct (attitude, subjectiveNorm, perceivedControl)
Each model predicts scale 1-5 (converted to 0-4 internally)
"""

import os
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import torch
from transformers import (
    DistilBertTokenizer,
    DistilBertForSequenceClassification,
    Trainer,
    TrainingArguments,
    EarlyStoppingCallback
)
from datasets import Dataset
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def load_and_split_data(csv_path, test_size=0.2, val_size=0.1):
    """Load CSV and split into train/val/test"""
    df = pd.read_csv(csv_path)
    
    # First split: train+val vs test
    train_val_df, test_df = train_test_split(
        df, test_size=test_size, random_state=42, stratify=df['label']
    )
    
    # Second split: train vs val
    train_df, val_df = train_test_split(
        train_val_df, test_size=val_size/(1-test_size), random_state=42, stratify=train_val_df['label']
    )
    
    print(f"Train: {len(train_df)}, Val: {len(val_df)}, Test: {len(test_df)}")
    
    return train_df, val_df, test_df

def prepare_dataset(df, tokenizer, max_length=128):
    """Tokenize text data"""
    def tokenize_function(examples):
        return tokenizer(
            examples['text'],
            padding='max_length',
            truncation=True,
            max_length=max_length
        )
    
    # Convert to HuggingFace Dataset
    dataset = Dataset.from_pandas(df[['text', 'label']])
    tokenized = dataset.map(tokenize_function, batched=True)
    
    return tokenized

def compute_metrics(eval_pred):
    """Compute accuracy and other metrics"""
    predictions, labels = eval_pred
    predictions = np.argmax(predictions, axis=1)
    
    accuracy = accuracy_score(labels, predictions)
    
    return {
        'accuracy': accuracy,
    }

def train_construct_model(construct_name, csv_path, output_dir):
    """Train a model for a specific TPB construct"""
    print(f"\n{'='*60}")
    print(f"Training model for: {construct_name}")
    print(f"{'='*60}")
    
    # Load data
    train_df, val_df, test_df = load_and_split_data(csv_path)
    
    # Get HuggingFace token
    hf_token = os.getenv('HUGGINGFACE_TOKEN')
    
    # Initialize tokenizer and model
    model_name = 'distilbert-base-uncased'
    tokenizer = DistilBertTokenizer.from_pretrained(model_name, token=hf_token)
    model = DistilBertForSequenceClassification.from_pretrained(
        model_name,
        num_labels=5,  # 5 scale levels (0-4)
        token=hf_token
    )
    
    # Prepare datasets
    train_dataset = prepare_dataset(train_df, tokenizer)
    val_dataset = prepare_dataset(val_df, tokenizer)
    test_dataset = prepare_dataset(test_df, tokenizer)
    
    # Training arguments
    training_args = TrainingArguments(
        output_dir=str(output_dir / construct_name),
        num_train_epochs=10,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=32,
        warmup_steps=100,
        weight_decay=0.01,
        logging_dir=str(output_dir / construct_name / 'logs'),
        logging_steps=10,
        eval_strategy='epoch',
        save_strategy='epoch',
        load_best_model_at_end=True,
        metric_for_best_model='accuracy',
        greater_is_better=True,
        save_total_limit=2,
        seed=42
    )
    
    # Initialize trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics,
        callbacks=[EarlyStoppingCallback(early_stopping_patience=3)]
    )
    
    # Train
    print("Starting training...")
    trainer.train()
    
    # Evaluate on test set
    print("\nEvaluating on test set...")
    test_results = trainer.evaluate(test_dataset)
    print(f"Test Accuracy: {test_results['eval_accuracy']:.4f}")
    
    # Get predictions for detailed metrics
    predictions = trainer.predict(test_dataset)
    pred_labels = np.argmax(predictions.predictions, axis=1)
    
    print("\nClassification Report:")
    print(classification_report(
        test_df['label'].values,
        pred_labels,
        target_names=[f'Scale {i+1}' for i in range(5)]
    ))
    
    # Save model and tokenizer
    final_model_path = output_dir / construct_name / 'final_model'
    trainer.save_model(str(final_model_path))
    tokenizer.save_pretrained(str(final_model_path))
    
    print(f"\nModel saved to: {final_model_path}")
    
    return test_results['eval_accuracy']

def main():
    # Setup paths
    datasets_dir = Path('./datasets')
    models_dir = Path('./models/tpb')
    models_dir.mkdir(parents=True, exist_ok=True)
    
    # Train models for each construct
    constructs = ['attitude', 'subjectiveNorm', 'perceivedControl']
    results = {}
    
    for construct in constructs:
        csv_path = datasets_dir / f'tpb_{construct}.csv'
        if csv_path.exists():
            accuracy = train_construct_model(construct, csv_path, models_dir)
            results[construct] = accuracy
        else:
            print(f"Warning: {csv_path} not found, skipping...")
    
    # Print summary
    print("\n" + "="*60)
    print("TRAINING SUMMARY")
    print("="*60)
    for construct, accuracy in results.items():
        print(f"{construct:20s}: {accuracy:.4f}")
    print(f"{'Average':20s}: {np.mean(list(results.values())):.4f}")

if __name__ == '__main__':
    main()
