export const calculateScore = ({
  communication,
  technical,
  confidence,
}) => {
  return (
    communication * 0.3 +
    technical * 0.5 +
    confidence * 0.2
  );
};