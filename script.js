function calculateClockOutTime() {
    const maxHoursPerWeek = 60;
    let inputHours = document.getElementById('hoursWorked').value;
    const startTime = document.getElementById('startTime').value;
    const addBuffer = document.querySelector('input[name="buffer"]:checked').value;
    const addLunchBreak = document.getElementById('lunchBreak').checked;

    // Interpret the inputHours based on the input format
    let hoursWorked = 0;
    if (inputHours.includes('h') || inputHours.includes('m')) {
        // Assume format is something like "55h 30m"
        const hoursMatch = inputHours.match(/(\d+)h/);
        const minsMatch = inputHours.match(/(\d+)m/);
        const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 0;
        const mins = minsMatch ? parseFloat(minsMatch[1]) / 60 : 0;
        hoursWorked = hours + mins;
    } else {
        // Assume format is decimal
        hoursWorked = parseFloat(inputHours);
    }

    if (isNaN(hoursWorked) || !startTime) {
        alert('Please enter valid values.');
        return;
    }

    const hoursLeft = maxHoursPerWeek - hoursWorked;
    if (hoursLeft <= 0) {
        document.getElementById('result').innerText = 'You have already reached or exceeded the 60-hour limit.';
        return;
    }

    const startTimeParts = startTime.split(':');
    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);

    const endTime = new Date();
    endTime.setHours(startHour, startMinute + (hoursLeft * 60), 0);

    // If lunch break is selected, add 30 minutes
    if (addLunchBreak) {
        endTime
