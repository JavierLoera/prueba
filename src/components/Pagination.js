import React from 'react'

const Pagination = ({ page, limit, totalItems, handleClicksetPage }) => {
    limit = Number(limit)
    const totalPages = Math.ceil(totalItems / limit);
    const firstPage = 1
    const lastPage = totalPages - 1
    const currentPage = page

    if (totalItems === 0) {
        return <div></div>
    }

    const renderLastPages = () => {
        const pages = [];
        pages.push(<div data-page={firstPage} key={`firstPage`} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === firstPage ? 'bg-slate-400' : ''}`}>{firstPage}</div>)
        pages.push(<div key={`elipsis`} className='rounded-lg p-2 m-2'>...</div>)
        for (let i = lastPage - 5; i <= lastPage; i++) {
            pages.push(
                <div data-page={i} key={i} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === i ? 'bg-slate-400' : ''}`}>
                    {i}
                </div>
            );
        }
        return pages;
    };

    const renderFirstPages = () => {
        let pages = [];

        for (let i = firstPage; i <= 5; i++) {
            pages.push(
                <div data-page={i} key={i} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === i ? 'bg-slate-400' : ''}`}>
                    {i}
                </div>
            );
        }
        pages.push(<div key={`elipsis`} onClick={handleClicksetPage} className='rounded-lg p-2 m-2'>...</div>)
        pages.push(<div data-page={lastPage} key={`lastpage`} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === lastPage ? 'bg-slate-400' : ''}`}>{lastPage}</div>)
        return pages;
    }

    return (
        <div className='flex flex-row justify-center'>
            {currentPage <= 4 && renderFirstPages()}

            {(currentPage > 4 && currentPage < lastPage - 4) && (
                <>
                    <div data-page={firstPage} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === firstPage ? 'bg-slate-400' : ''}`}>{firstPage}</div>
                    <div className='rounded-lg p-2 m-2'>...</div>
                    <div data-page={currentPage - 1} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === currentPage - 1 ? 'bg-slate-400' : ''}`}>{currentPage - 1}</div>
                    <div data-page={currentPage} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === page ? 'bg-slate-400' : ''}`}>{currentPage}</div>
                    <div data-page={currentPage + 1} onClick={handleClicksetPage} className={`rounded-lg p-2 m-2 ${currentPage === currentPage + 1 ? 'bg-slate-400' : ''}`}>{currentPage + 1}</div>
                    <div className='rounded-lg p-2 m-2'>...</div>
                    <div data-page={lastPage} onClick={handleClicksetPage} className='rounded-lg p-2 m-2'>{lastPage}</div>
                </>
            )}

            {currentPage >= lastPage - 4 && renderLastPages()}
        </div>
    )
}

export default Pagination

