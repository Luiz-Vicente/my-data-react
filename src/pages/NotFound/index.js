import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div className='page page-error'>
        <h1>404 - Página não encontrada</h1>
        <p>Desculpe, a página que você está procurando não existe.</p>
      </div>
    );
  }
}

export default NotFound;