import { Box, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPost } from '../api/post';
import { baseUrl } from '../config';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [paginationNumber, setPaginationNumber] = useState(20)
    const [change, setChange] = useState(true)
    const postPerPage = paginationNumber;
    const pagesVisited = pageNumber * postPerPage;
    let pageCount = 1;
    useEffect(() => {
        getPost(0)
            .then(res => res.json())
            .then(data => {
                setPosts(data?.hits)
            })
    }, [change]);

    useEffect(() => {

        setInterval(function () {
            getPost(pageCount)
                // console.log(getPost)
                .then(res => res.json())
                .then(data => {
                    const oldPost = posts;
                    oldPost.push(...data.hits)
                    setPosts(oldPost)
                    console.log(posts)

                    pageCount++;
                })
        }, 10000)
    }, [])


    return (
        <>

            <Box>
                {
                    posts?.slice(pagesVisited, pagesVisited + postPerPage)?.map((post, index) => (

                        <Box key={index} sx={{ my: 3, backgroundColor: '#202124', width: '60%', height: '200px', mx: 'auto' }}>
                            <>
                                <a href={`${baseUrl}search_by_date?tags=story&page=${pagesVisited / 20}`} target='_blank'>
                                    <TableContainer component={Paper} >
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Title</TableCell>
                                                    <TableCell align="right">Created at</TableCell>
                                                    <TableCell align="right">Author</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >

                                                    <TableCell align="right">{post.title}</TableCell>
                                                    <TableCell align="right">{post.created_at}</TableCell>
                                                    <TableCell align="right">{post.author}</TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </a>

                            </>
                        </Box>
                    ))
                }
            </Box>
            <Stack spacing={2} sx={{ width: '50%', mx: 'auto' }}>
                <Pagination
                    count={posts.length / 20}
                    onChange={(event, value) => {
                        setPageNumber(value)
                        if (change) {
                            setChange(false)
                        }
                        else {
                            setChange(true)
                        }
                    }} />
            </Stack>

        </>
    );
};

export default Posts;