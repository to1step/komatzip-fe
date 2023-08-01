import React, { ReactElement } from 'react';

interface ContactItemProps {
  id: number;
  name: string;
}

function ContactItem({ id, name }: ContactItemProps): ReactElement {
  return (
    <li>
      <a href={`/contacts/${id}`}>{name}</a>
    </li>
  );
}

export default function Root(): ReactElement {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden />
            <div className="sr-only" aria-live="polite" />
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <ContactItem id={1} name="Your Name" />
            <ContactItem id={2} name="Your Friend" />
          </ul>
        </nav>
      </div>
      <div id="detail" />
    </>
  );
}
