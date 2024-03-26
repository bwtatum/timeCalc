function calculateClockOutTime() {
    const maxHoursPerWeek = 60;
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const minutesWorked = parseFloat(document.getElementById('minutesWorked').value) / 60;
    const totalHoursWorked = hoursWorked + minutesWorked;
    const startTime = document.getElementById('startTime').value;
    const addBuffer = document.querySelector('input[name="buffer"]:checked').value;

    if (isNaN(totalHoursWorked) || !startTime) {
        alert('Please enter valid values.');
        return;
    }

    const hoursLeft = maxHoursPerWeek - totalHoursWorked;
    if (hoursLeft <= 0) {
        document.getElementById('result').innerText = 'You have already reached or exceeded the 60-hour limit.';
        return;
    }

    const startTimeParts = startTime.split(':');
    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);

    const endTime = new Date();
    endTime.setHours(startHour, startMinute + (hoursLeft * 60), 0);

    // If buffer is selected, subtract 5 minutes
    if (addBuffer === 'yes') {
        endTime.setMinutes(endTime.getMinutes() - 5);
    }

    const endHour = endTime.getHours().toString().padStart(2, '0');
    const endMinute = endTime.getMinutes().toString().padStart(2, '0');

    document.getElementById('result').innerText = `You should clock out by ${endHour}:${endMinute} to not exceed 60 hours and allow for buffer time.`;
}
