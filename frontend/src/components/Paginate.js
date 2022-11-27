import React from 'react'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


function Paginate({pages, page, isAdmin = false, keyword = ''}) {
   
    console.log('keyword1:', keyword)
    if(keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    
    console.log('keyword2',keyword)


  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer 
                key={x + 1} 
                to={{
                    pathname: isAdmin ? '/admin/productlist/' : '/',
                    search: `?keyword=${keyword}&page=${x + 1}`
                }}
                    
                   
                >

                    <Pagination.Item disabled={x + 1 === page} style={{border: '1px solid white'}}>{x + 1}</Pagination.Item> 
                </LinkContainer>
            ))} 
        </Pagination>

    
  ) 

    )
}

export default Paginate
