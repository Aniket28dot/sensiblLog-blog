import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { getComments } from "../lib/graphcms";

export default function Comments({ slug }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then((result) => {
            setComments(result);
        });
    }, []);

    return (
        <>
            {comments.length > 0 && (
                <div class="mx-auto my-24 max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                        {comments.length}
                        {' '}
                        Comments
                    </h3>
                    {comments.map((comment, index) => (
                        <div key={index} class="w-full text-left">
                            <div class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                                <h3 class="font-medium">{comment.name}</h3>
                                <time class="text-xs" datetime="2022-11-13T20:00Z">{comment.createdAt}</time>
                            </div>
                            <p class="text-sm">{parse(comment.comment)}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}