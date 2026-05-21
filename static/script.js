document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const iq = document.getElementById('iq').value;
    const cgpa = document.getElementById('cgpa').value;
    const resultDiv = document.getElementById('result');
    
    // UI Loading state
    resultDiv.className = "result-box"; 
    resultDiv.innerHTML = "Processing prediction...";
    
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ iq: iq, cgpa: cgpa })
        });
        
        const data = await response.json();
        
        if (data.prediction === 1) {
            resultDiv.innerHTML = "🎉 Congrats! This student is likely to be PLACED.";
            resultDiv.classList.add('placed');
        } else {
            resultDiv.innerHTML = "❌ This student is unlikely to be placed.";
            resultDiv.classList.add('not-placed');
        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ Error connecting to the prediction server.";
        resultDiv.classList.add('not-placed');
    }
});