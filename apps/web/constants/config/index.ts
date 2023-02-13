const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`,
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  dbAnonKey: getEnvironmentVariable('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  dbApiUrl: getEnvironmentVariable('NEXT_PUBLIC_SUPABASE_URL'),
};
