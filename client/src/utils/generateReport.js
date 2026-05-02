export const generateSessionReport = (sessionData) => {
  const report = {
    generatedAt: new Date().toISOString(),
    ...sessionData
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `alcoaware-report-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
