import React from 'react';
// import FakeDataBooks from '../../../FakeDataBooks';
import BookCard from '../../../Components/Admin/BookCard/BookCard';

import { PiBooksFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import titleCSS from '../../../Styles/db_title.module.css';
import booksCSS from '../../../Styles/db_books.module.css';
import errorHandleCSS from '../../../Styles/db_tables.module.css';
import { Axios, BookGetAll } from '../../../API/Api';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function BooksList() {

    // ====== books-data ====== //

    const getAllBooks = async() => {

        return await Axios.get(`${BookGetAll}`);

    }

    const {data , isLoading , isError , refetch} = useQuery('getAllBooks' , getAllBooks);

    return <React.Fragment>

        <div className={titleCSS.container}>

            <div className={titleCSS.title}>

                <div className={titleCSS.title_box}>

                    <PiBooksFill />
                    <p>Books</p>

                </div>

                <div className={titleCSS.actions}>

                    <Link to={'add'}>Add Book</Link>

                </div>

            </div>

            {isLoading ? 
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>

                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--active-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />

                </div> : (isError ?
                        <div className={errorHandleCSS.empty_doc}>

                        <BiErrorAlt />
                        <h3>Error on fetch books</h3>

                    </div>: ( data.data.data.length === 0 ?
                        <div className={errorHandleCSS.empty_doc}>

                            <BiErrorAlt />
                            <h3>No books yet</h3>

                        </div> : <div className={booksCSS.container}>

                            {data?.data.data.map( book => <BookCard key={book._id} book={book} refetch={refetch} />)}

                        </div>
                    )
                )
            }

        </div>

    </React.Fragment>

}
