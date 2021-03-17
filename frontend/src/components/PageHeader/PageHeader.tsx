import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PageHeader: React.FC = () => (
  <nav className="flex items-center justify-between flex-wrap bg-gray-600 p-6">
    <div className="flex items-center flex-no-shrink text-white mr-6">
      <div className="inline-block text-xl px-4 leading-none rounded text-white border-white hover:border-current hover:text-gray-500 hover:bg-white mt-4 lg:mt-0">
        <Link to="/">
          <FontAwesomeIcon icon={faCompactDisc} />
          <span className="font-semibold text-xl tracking-tight">Herodorus</span>
        </Link>
      </div>
    </div>
    <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-current hover:text-gray-500 hover:bg-white mt-4 lg:mt-0">
      <Link to="/login">
        Login
      </Link>
    </div>
  </nav>
);

export default PageHeader;
