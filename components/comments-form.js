import React, { useState, useEffect } from 'react';
import { submitComment } from '../lib/graphcms';

export default function Comments({ slug }) {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });

    useEffect(() => {
        setLocalStorage(window.localStorage);
        const initalFormData = {
            name: window.localStorage.getItem('name'),
            email: window.localStorage.getItem('email'),
            storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
        };
        setFormData(initalFormData);
    }, []);

    const onInputChange = (e) => {
        const { target } = e;
        if (target.type === 'checkbox') {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.checked,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };

    const handlePostSubmission = () => {
        setError(false);
        const { name, email, comment, storeData } = formData;
        if (!name || !email || !comment) {
            setError(true);
            return;
        }
        const commentObj = {
            name,
            email,
            comment,
            slug,
        };

        if (storeData) {
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('name');
            localStorage.removeItem('email');
        }

        submitComment(commentObj)
            .then((res) => {
                if (res.createComment) {
                    if (!storeData) {
                        formData.name = '';
                        formData.email = '';
                    }
                    formData.comment = '';
                    setFormData((prevState) => ({
                        ...prevState,
                        ...formData,
                    }));
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                }
            });
    };

    return (
        <div class="">
            <div class="mx-auto max-w-screen-sm">
                <h1 class="mt-10 mb-4 text-xl font-bold sm:mb-6 sm:text-3xl">Thoughts</h1>

                <div class="flex text-left text-gray-700">
                    <div class="w-full space-y-3 text-gray-700">
                        <div class="">
                            <input type="text" value={formData.name} onChange={onInputChange} name='name' placeholder="name" class="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring" />
                        </div>
                        <div class="">
                            <input type="email" value={formData.email} onChange={onInputChange} name='email' placeholder="email" class="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring" />
                        </div>
                        <div class="">
                            <textarea value={formData.comment} onChange={onInputChange} name="comment" placeholder="write your thoughts here" cols="30" rows="6" class="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"></textarea>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
                        <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I share my thoughts.</label>
                    </div>
                </div>
                {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
                <div class="float-right">
                    <button type="button" onClick={handlePostSubmission} class="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring">Send</button>
                    {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Thanks for sharing your thoughts!</span>}
                </div>
            </div>
        </div>
    )
}