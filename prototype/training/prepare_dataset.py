"""
Prepare TPB and TTM training datasets from JSON files
Converts JSON format to CSV for easier training
"""

import json
import pandas as pd
from pathlib import Path

def load_tpb_data(json_path):
    """Load TPB training data and convert to flat format"""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    rows = []
    for question in data['questions']:
        question_id = question['id']
        question_text = question['question']
        construct = question['construct']
        
        # Each scale level (1-5)
        for scale_level, samples in question['samples'].items():
            for sample_text in samples:
                rows.append({
                    'question_id': question_id,
                    'question': question_text,
                    'construct': construct,
                    'text': sample_text,
                    'label': int(scale_level) - 1,  # Convert 1-5 to 0-4 for model
                    'label_name': f"scale_{scale_level}"
                })
    
    return pd.DataFrame(rows)

def load_ttm_data(json_path):
    """Load TTM training data and convert to flat format"""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Stage to numeric mapping
    stage_to_label = {
        'preContemplation': 0,
        'contemplation': 1,
        'preparation': 2,
        'action': 3,
        'maintenance': 4
    }
    
    rows = []
    for question in data['questions']:
        question_id = question['id']
        question_text = question['question']
        
        # Each stage
        for stage_name, samples in question['samples'].items():
            for sample_text in samples:
                rows.append({
                    'question_id': question_id,
                    'question': question_text,
                    'text': sample_text,
                    'label': stage_to_label[stage_name],
                    'label_name': stage_name
                })
    
    return pd.DataFrame(rows)

def main():
    # Paths
    data_dir = Path('../data')
    output_dir = Path('./datasets')
    output_dir.mkdir(exist_ok=True)
    
    # Load TPB data
    print("Loading TPB data...")
    tpb_df = load_tpb_data(data_dir / 'tpb_training_data.json')
    print(f"TPB samples: {len(tpb_df)}")
    print(f"TPB constructs: {tpb_df['construct'].unique()}")
    print(f"TPB labels: {sorted(tpb_df['label'].unique())}")
    
    # Save TPB datasets (one per construct)
    for construct in tpb_df['construct'].unique():
        construct_df = tpb_df[tpb_df['construct'] == construct]
        output_path = output_dir / f'tpb_{construct}.csv'
        construct_df.to_csv(output_path, index=False)
        print(f"Saved {len(construct_df)} samples to {output_path}")
    
    # Save combined TPB
    tpb_df.to_csv(output_dir / 'tpb_combined.csv', index=False)
    print(f"Saved combined TPB to {output_dir / 'tpb_combined.csv'}")
    
    # Load TTM data
    print("\nLoading TTM data...")
    ttm_df = load_ttm_data(data_dir / 'ttm_training_data.json')
    print(f"TTM samples: {len(ttm_df)}")
    print(f"TTM stages: {sorted(ttm_df['label_name'].unique())}")
    print(f"TTM labels: {sorted(ttm_df['label'].unique())}")
    
    # Save TTM dataset
    ttm_df.to_csv(output_dir / 'ttm.csv', index=False)
    print(f"Saved {len(ttm_df)} samples to {output_dir / 'ttm.csv'}")
    
    # Print statistics
    print("\n=== Dataset Statistics ===")
    print(f"Total TPB samples: {len(tpb_df)}")
    print(f"Total TTM samples: {len(ttm_df)}")
    print(f"Total samples: {len(tpb_df) + len(ttm_df)}")
    
    print("\nTPB Label Distribution:")
    print(tpb_df['label'].value_counts().sort_index())
    
    print("\nTTM Label Distribution:")
    print(ttm_df['label'].value_counts().sort_index())

if __name__ == '__main__':
    main()
