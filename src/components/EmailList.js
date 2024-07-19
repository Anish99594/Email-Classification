import React from 'react';

const EmailList = ({ emails }) => {
  return (
    <div>
      {emails.map((email, index) => (
        <div key={index} className="p-4 border-b">
          <h3 className="font-bold">{email.subject}</h3>
          <p>{email.snippet}</p>
          <p className="text-gray-500">{email.category}</p>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
