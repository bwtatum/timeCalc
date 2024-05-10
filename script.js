// Function to parse input hours
function parseInputHours(input) {
    let hours = 0;
    // Check if input is in decimal format
    if (/^\d+(\.\d+)?$/.test(input)) {
        return parseFloat(input);
    }
    // Check for "hrs mins" format and extract hours and minutes
    const hoursMatch = input.match(/(\d+)\s*h/);
    const minsMatch = input.match(/(\d+)\s*m/);
    if (hoursMatch) {
        hours += parseInt(hoursMatch[1], 10);
    }
    if (minsMatch) {
        hours += parseInt(minsMatch[1], 10) / 60;
    }
    return hours;
}

// Main function to calculate clock-out time
function calculateClockOutTime() {
    const maxHoursPerWeek = 60;
    let inputHours = document.getElementById('hoursWorked').value.trim();
    const startTime = document.getElementById('startTime').value;
    const addLunchBreak = document.getElementById('lunchBreak').checked;
    const addBuffer = document.getElementById('addBuffer').checked;

    let hoursWorked = parseInputHours(inputHours);

    if (isNaN(hoursWorked) || !startTime) {
        alert('Please ensure all inputs are filled correctly.');
        return;
    }

    let hoursLeft = maxHoursPerWeek - hoursWorked;
    if (hoursLeft <= 0) {
        document.getElementById('result').innerText = 'You have already reached or exceeded the 60-hour limit.';
        return;
    }

    const [startHour, startMinute] = startTime.split(':').map(num => parseInt(num, 10));
    let endTime = new Date();
    endTime.setHours(startHour, startMinute, 0, 0);
    endTime.setMinutes(endTime.getMinutes() + Math.floor(hoursLeft * 60));

    if (addLunchBreak) {
        endTime.setMinutes(endTime.getMinutes() + 30);
    }

    if (addBuffer) {
        endTime.setMinutes(endTime.getMinutes() - 5);
    }

    const endHourFormatted = endTime.getHours().toString().padStart(2, '0');
    const endMinuteFormatted = endTime.getMinutes().toString().padStart(2, '0');

    document.getElementById('result').innerText = `You should clock out by ${endHourFormatted}:${endMinuteFormatted} to not exceed 60 hours, including lunch and buffer time.`;
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('change', function(event){
    if(event.target.checked) {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
});
