export default ({ seconds }) => new Date(seconds * 1000).toISOString().substr(14, 5);