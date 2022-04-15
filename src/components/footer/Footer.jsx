function Footer() {
  return (
    <>
      <footer className="bg-light text-lg-start">
        <hr className="m-0" />
        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          © 2022 Copyright :
          <a className="text-dark" href="#" className="link">
            {' '}
            My Blogger
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
