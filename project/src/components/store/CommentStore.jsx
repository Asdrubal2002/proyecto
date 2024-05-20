import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const CommentStore = ({ comment, profile, isAuthenticated, delete_comment_store, edit_comment_store }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const handleEdit = () => {
        
        setIsEditing(true);
    };

    const handleSave = () => {
        // Aquí puedes implementar la lógica para guardar el comentario editado
        edit_comment_store(editedContent, comment.id)
        setIsEditing(false);
        
    };

    const handleCancel = () => {
        setEditedContent(comment.content);
        setIsEditing(false);
        
    };

    const handleDelete = () => {
        //onDelete(comment.id);
        delete_comment_store(comment.id)
    };



    return (
        <div className="flex items-start gap-2.5 p-2">
            {comment.user_photo != null ? (
                <img className="w-8 h-7 rounded-full" src={comment.user_photo} alt="Profile Picture" />
            ) : (
                <div className="w-8 h-7 rounded-full bg-azul_corp flex items-center justify-center font-semibold">
                    {`${comment.user_profile.firs_name.charAt(0)}`}
                </div>
            )}
            {/* Resto del código de tu componente */}
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-white">{comment && comment.user_profile.firs_name} {comment.user_profile.last_name}</span>
                    <span className="text-sm font-normal text-gray-400 ">{new Date(comment.created).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
                </div>
                <div className="flex flex-col leading-1.5 border-gray-200 bg-gray-800 rounded-e-xl rounded-es-xl">
                    {isEditing ? (
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="text-sm font-normal text-gray-100 px-4 py-2 bg-stone-900 rounded-e-xl"
                            maxLength={200} // Aquí estableces el límite de caracteres

                        />
                    ) : (
                        <p className="text-sm font-normal text-white px-4 py-2">{comment.content}</p>
                    )}
                </div>
                {/* Resto del código de tu componente */}
                {isAuthenticated ? <>
                    {profile && profile.id === comment.user_profile.id && (
                        <div className="flex items-center space-x-2 text-sm">
                            {isEditing ? (
                                <>
                                    <button className="text-white hover:text-gray-300 focus:outline-none" onClick={handleSave}>Guardar</button>
                                    <button className="text-white hover:text-gray-300 focus:outline-none" onClick={handleCancel}>Cancelar</button>
                                </>
                            ) : (
                                <button className="text-white hover:text-gray-300 focus:outline-none" onClick={handleEdit}><PencilIcon className="h-4 w-4" /></button>
                            )}
                            <button className="text-white hover:text-gray-300 focus:outline-none" onClick={handleDelete}><TrashIcon className="h-4 w-4" /></button>
                        </div>
                    )}
                </> : <></>}
            </div>
        </div>
    );
};

export default CommentStore;
