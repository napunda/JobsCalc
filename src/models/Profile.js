let data = {
  name: "Anderson Alves",
  avatar: "https://github.com/napunda.png",
  monthlyBudget: 6000,
  daysPerWeek: 5,
  hoursPerDay: 4,
  vacationPerYear: 4,
  hoursValue: 75,
};

const Profile = {
  get() {
    return data;
  },
  post(newProfile) {
    data = newProfile;
  },
};

module.exports = Profile;
