import React from 'react';
import { CommentsProduct } from '../CommentsProduct';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

const Comments = ({ loading, comments, profile, isAuthenticated, delete_comment_product, edit_comment_prodcut }) => {
  return (
    <div style={{ maxHeight: '400px',  overflowY: 'scroll', scrollbarWidth: 'none', }}>
      {loading ? (
        // Si está cargando, muestra un indicador de carga
        <div>Cargando comentarios...</div>
      ) : (
        // Si no está cargando, muestra los comentarios
        <div>
          {comments && Array.isArray(comments) && comments.length === 0 ? (
            // Si no hay comentarios, muestra un mensaje de que no hay comentarios
            <div className="flex items-center gap-2 p-3 rounded-md">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400" />
              <p className="text-gray-200 font-semibold">¡Sé el primero en comentar!</p>
            </div>
          ) : (
            // Si hay comentarios, muestra cada uno utilizando el componente CommentsProduct
            comments.map((comment, index) => (
              <div key={index}>
                <CommentsProduct
                  comment={comment}
                  profile={profile}
                  isAuthenticated={isAuthenticated}
                  delete_comment_product={delete_comment_product}
                  edit_comment_prodcut={edit_comment_prodcut}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Comments;
