import { SEARCH_FORM_INPUTS, SEARCH_SCREEN_PROPS } from '@constants/types';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const SearchScreen: React.FC<SEARCH_SCREEN_PROPS> = ({ onSearch }) => {
    const validationSchema = Yup.object({
        query: Yup.string()
            .min(3, 'Enter at least 3 characters')
            .matches(
                /^[A-Za-z0-9\s]*$/,
                'Only English letters, numbers, and spaces are allowed'
            )
            .required('Search field is required')
    });

    const {
        register,
        watch,
        formState: { errors },
        trigger
    } = useForm<SEARCH_FORM_INPUTS>({
        resolver: yupResolver(validationSchema)
    });

    const query = watch('query', '');

    const handleDebounceSearch = useCallback(async () => {
        const isValid = await trigger('query');
        if (isValid) {
            onSearch(query);
        }
    }, [query, onSearch, trigger]);

    useEffect(() => {
        const delayDebounce = setTimeout(handleDebounceSearch, 1000);

        return () => clearTimeout(delayDebounce);
    }, [query, handleDebounceSearch]);

    return (
        <div className="search-screen">
            <h1 className="search-title">
                Let&apos;s Find Some <span className="highlight">Art</span>
            </h1>
            <h2>Here</h2>
            <form>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search art author/title"
                    {...register('query')}
                />
                {query.trim() !== '' && errors.query && (
                    <p className="error-message">{errors.query.message}</p>
                )}
            </form>
        </div>
    );
};

export default React.memo(SearchScreen);
