@echo off
echo ============================================================
echo Starting BERT API Server (HuggingFace Version)
echo ============================================================
echo.
echo Loading models from HuggingFace Hub...
echo First run will download models (~800MB) - this takes a few minutes
echo Subsequent runs will be fast (models are cached)
echo.
python api_server_huggingface.py
pause
