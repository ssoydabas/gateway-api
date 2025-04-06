export const generateRandomTurkishPhoneNumber = () => {
  const randomDigits = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10),
  ).join('');
  return `+90${randomDigits}`;
};

export const generateRandomUserData = () => {
  return {
    first_name: `Test ${Date.now()}`,
    last_name: `Last Name ${Date.now()}`,
    phone: generateRandomTurkishPhoneNumber(),
    email: `test${Date.now()}@test.com`,
    password: `0123456789`,
  };
};
