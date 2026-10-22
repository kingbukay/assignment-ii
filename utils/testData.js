export function generateUserData() {
  const timestamp = Date.now();

  return {
    firstName: `User${timestamp}`,
    lastName: `Tester${timestamp}`,
    email: `automation${timestamp}@example.com`,
    password: `Test@${timestamp}Aa`
  };
}