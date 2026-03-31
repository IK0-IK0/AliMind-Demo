# Quick Start Guide: Questionnaire System

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (if needed)

```bash
cd prototype
npm install
```

### Step 2: Run Without Hugging Face (Rule-Based Only)

```bash
npm run dev
```

Open http://localhost:5173 and navigate to the Demo page.

**That's it!** The questionnaire will work with the existing rule-based system.

---

## 🤖 Optional: Enable AI with Hugging Face

### Step 1: Get API Key

1. Go to https://huggingface.co
2. Sign up for free account
3. Go to Settings → Access Tokens
4. Create new token (read access is enough)
5. Copy the token (starts with `hf_`)

### Step 2: Configure Environment

```bash
# Copy template
cp .env.example .env

# Edit .env file
nano .env  # or use your favorite editor
```

Add your API key:
```
REACT_APP_HUGGINGFACE_API_KEY=hf_your_actual_key_here
REACT_APP_HUGGINGFACE_MODEL_ID=facebook/blenderbot-400M-distill
```

### Step 3: Restart Server

```bash
# Stop the dev server (Ctrl+C)
# Start again
npm run dev
```

The system will now use AI-enhanced responses!

---

## 📋 What You'll See

### 1. Questionnaire (15 Questions)

The user will answer:
- **Questions 1-5**: How they feel about healthy eating (Attitude)
- **Questions 6-8**: Social support from family/friends
- **Questions 9-10**: Confidence in their ability to change
- **Questions 11-15**: Current readiness stage

### 2. Score Calculation

After completion, the system calculates:
- **TPB Scores**: Attitude, Social Support, Confidence (0-100)
- **TTM Stage**: Pre-contemplation → Maintenance
- **Confidence**: How certain the classification is

### 3. Chat Interface

User enters chat with:
- Pre-populated scores visible in sidebar
- Personalized greeting based on their profile
- Responses tailored to their readiness stage

---

## 🧪 Test Different Profiles

### High Motivation Profile
Answer all questions with the highest option (5th choice)
- **Expected**: High scores (80-100), Action/Maintenance stage
- **Response style**: Practical tips, recipe recommendations

### Low Readiness Profile
Answer all questions with the lowest option (1st choice)
- **Expected**: Low scores (0-20), Pre-contemplation stage
- **Response style**: Awareness building, no pressure

### Mixed Profile (Realistic)
- High attitude (questions 1-5): Choose 4th or 5th options
- Low social support (questions 6-8): Choose 1st or 2nd options
- Moderate confidence (questions 9-10): Choose 3rd option
- Contemplation stage (questions 11-15): Choose 2nd option

**Expected**: System identifies social support as main barrier

---

## 🔧 Troubleshooting

### Questionnaire not showing?

Check `DemoPage.tsx`:
```typescript
const [showQuestionnaire, setShowQuestionnaire] = useState(true); // Should be true
```

### Scores not displaying?

Open browser console (F12) and check for errors:
```javascript
console.log('Questionnaire results:', questionnaireResults);
```

### Hugging Face not working?

1. Check API key is set:
```bash
echo $REACT_APP_HUGGINGFACE_API_KEY
```

2. Check .env file exists:
```bash
ls -la .env
```

3. Restart dev server after changing .env

4. Check browser console for API errors

### Questions not advancing?

- Make sure you select an option before clicking "Next"
- Check browser console for JavaScript errors
- Try refreshing the page

---

## 📊 Understanding the Scores

### TPB Scores (0-100)

| Score | Interpretation | Meaning |
|-------|---------------|---------|
| 0-33  | Low | Significant barrier |
| 34-66 | Moderate | Some challenges |
| 67-100 | High | Strong facilitator |

### TTM Stages

| Stage | Description | Focus |
|-------|-------------|-------|
| Pre-contemplation | Not thinking about change | Awareness |
| Contemplation | Considering change | Motivation |
| Preparation | Planning to change | Action planning |
| Action | Currently changing | Support & coping |
| Maintenance | Sustaining change | Relapse prevention |

---

## 🎯 Next Steps

### For Development

1. **Run Tests**
   ```bash
   npm test
   ```

2. **Check Examples**
   ```bash
   npx ts-node src/services/questionnaireService.example.ts
   ```

3. **Read Documentation**
   - `QUESTIONNAIRE_SYSTEM_README.md` - Full system docs
   - `INTEGRATION_GUIDE.md` - Integration patterns
   - `CHANGES_SUMMARY.md` - What changed

### For Customization

1. **Modify Questions**: Edit `src/services/questionnaireService.ts`
2. **Change Styling**: Edit `src/components/QuestionnaireFlow.tsx`
3. **Adjust Scoring**: Modify calculation functions in `questionnaireService.ts`
4. **Add Features**: See "Future Enhancements" in `CHANGES_SUMMARY.md`

### For Production

1. **Set Environment Variables** in your hosting platform
2. **Enable Error Tracking** (Sentry, LogRocket, etc.)
3. **Add Analytics** (track completion rates)
4. **Implement Caching** (for API responses)
5. **Add Loading States** (for better UX)

---

## 💡 Tips

### For Better User Experience

1. **Add Progress Indicators**: Already included! Shows "Question X of 15"
2. **Allow Going Back**: Add a "Previous" button if needed
3. **Save Progress**: Use localStorage to resume later
4. **Add Tooltips**: Explain what each question measures

### For Better Performance

1. **Lazy Load HF Connector**: Only load when needed
2. **Cache Responses**: Store common responses
3. **Debounce API Calls**: Prevent rapid-fire requests
4. **Use Smaller Model**: Try `facebook/blenderbot-400M-distill` instead of 1B

### For Better Accuracy

1. **Fine-tune Model**: Train on nutrition coaching data
2. **Add More Questions**: Increase reliability
3. **Validate Answers**: Check for inconsistencies
4. **A/B Test**: Compare with free-form assessment

---

## 📞 Need Help?

1. **Check Documentation**: Start with `QUESTIONNAIRE_SYSTEM_README.md`
2. **Review Examples**: See `questionnaireService.example.ts`
3. **Run Tests**: Verify everything works with `npm test`
4. **Check Console**: Browser console shows helpful errors
5. **Read Integration Guide**: `INTEGRATION_GUIDE.md` has troubleshooting

---

## ✅ Success Checklist

- [ ] Application runs without errors
- [ ] Questionnaire displays all 15 questions
- [ ] Progress bar updates correctly
- [ ] Scores calculate after completion
- [ ] Chat interface shows scores in sidebar
- [ ] Responses are personalized to user profile
- [ ] Reset button works correctly
- [ ] Mobile responsive (test on phone)
- [ ] No console errors
- [ ] Tests pass (`npm test`)

---

**You're all set!** 🎉

The questionnaire system is now integrated and ready to use. Start by testing different user profiles to see how the system adapts its responses.
