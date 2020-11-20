export const Footer = () => {
  return (
    <footer>
      <h5>
        {new Date().toLocaleDateString('en-US', { year: 'numeric' })} &copy;
        flylxz corp
      </h5>
    </footer>
  );
};
