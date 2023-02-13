async function loadScopesFormWorkspace() {
  const { packages } = await require('@egoist/get-packages').getPackages(
    __dirname,
  );
  return [
    'supabase',
    ...packages.map((p) => p.data.name.replace('@unliked/', '')),
  ];
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': async () => [
      2,
      'always',
      [...(await loadScopesFormWorkspace())],
    ],
  },
};
