import Container from './Container';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 py-8 text-sm">
      <Container>
        <div className="grid items-center gap-6 md:grid-cols-3">
          <div className="opacity-70">© {new Date().getFullYear()} Augutsya.com — All rights reserved.</div>
          <div className="justify-self-center">Built in React • Tailwind (CDN)</div>
          <div className="justify-self-end opacity-70">Demo export build</div>
        </div>
      </Container>
    </footer>
  );
}