const Duration = ({ seconds }) => new Date(seconds * 1000).toISOString().substr(14, 5);
export default Duration;