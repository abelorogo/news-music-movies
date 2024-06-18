// donation-detail.js

document.addEventListener('DOMContentLoaded', function() {
    const donation = JSON.parse(localStorage.getItem('latestDonation'));

    if (donation) {
        const detailDiv = document.getElementById('donationDetail');
        detailDiv.innerHTML = `
            <p><strong>Name:</strong> ${donation.name}</p>
            <p><strong>Email:</strong> ${donation.email}</p>
            <p><strong>Donation Amount ($):</strong> ${donation.amount}</p>
            <p><strong>Message:</strong> ${donation.message}</p>
            <p><strong>Date:</strong> ${donation.date}</p>
        `;
    } else {
        detailDiv.innerHTML = '<p>No donation details available.</p>';
    }
});
