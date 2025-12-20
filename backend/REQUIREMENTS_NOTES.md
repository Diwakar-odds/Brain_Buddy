# Requirements Installation Notes

## Issue with Full Requirements

The full `requirements.txt` has a dependency conflict:
- `avalanche-lib==0.4.0` requires `typing-extensions==4.4.0`
- Other packages (FastAPI, PyTorch, Pydantic) require newer versions

## Solution: Use Minimal Requirements

For **data seeding and API only**, use:
```bash
pip install -r requirements.minimal.txt
```

This includes:
- FastAPI + Uvicorn (API server)
- Motor + Beanie (MongoDB)
- Pydantic (data validation)
- Authentication packages
- Basic utilities

## Full Requirements (Optional)

For the **complete AI features** (music generation, continual learning, NLP), you'll need to:

1. **Option A**: Install without avalanche-lib
   ```bash
   pip install -r requirements.txt --no-deps
   pip install avalanche-lib  # Let pip choose compatible version
   ```

2. **Option B**: Update avalanche-lib
   ```bash
   # Edit requirements.txt: change avalanche-lib==0.4.0 to avalanche-lib>=0.4.0
   pip install -r requirements.txt
   ```

3. **Option C**: Use separate virtual environments
   ```bash
   # One for API/Data
   python -m venv venv-api
   source venv-api/bin/activate  # Windows: venv-api\Scripts\activate
   pip install -r requirements.minimal.txt

   # One for AI/Training
   python -m venv venv-ai
   source venv-ai/bin/activate
   pip install torch transformers diffusers scikit-learn
   ```

## Current Setup

You can proceed with:
1. ✅ Data seeding (`requirements.minimal.txt` installed)
2. ✅ API server
3. ✅ MongoDB operations
4. ✅ User authentication

AI features (music generation, continual learning) will be added later when needed.
