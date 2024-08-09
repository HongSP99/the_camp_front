import { useEffect, useState } from 'react'
import PagingComponent from './PagingComponent';
import Review from './Review';

const ReviewList = () => {
  return (
    <div>
      <ReviewLikeDesc />
      <ReviewDesc />
    </div>
  )
}

const ReviewLikeDesc = () => {
  const [likeDataCurrentPage, setLikeDataCurrentPage] = useState(0);
  const [likeData, setLikeData] = useState();

  const onLikeDataPageChange = ({ selected }) => {
    setLikeDataCurrentPage(selected);
  }

  const reviewOrderByLikeDesc = async () => {
    const response = await fetch(`http://localhost:8080/reviews/desc/like?page=${likeDataCurrentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const json = await response.json();
      setLikeData(json);
    }
  }

  const LikeCountApi = async () => {
    const response = await fetch(``)
  }

  useEffect(() => {
    reviewOrderByLikeDesc();
  }, [likeDataCurrentPage])

  return (
    <div>
      <h1>리뷰 좋아요 순</h1>
      {likeData?.content.map((item, idx) => (
        <Review item={item} idx={idx} />
      ))}
      <PagingComponent currentPage={likeData?.number} pageCount={likeData?.totalPages} onPageChange={onLikeDataPageChange} />
    </div>
  )
}

const ReviewDesc = () => {
  const [dataCurrentPage, setDataCurrentPage] = useState(0);
  const [data, setData] = useState();

  const onDataPageChange = ({ selected }) => {
    setDataCurrentPage(selected);
  }

  const reviewOrderByDesc = async () => {
    const response = await fetch(`http://localhost:8080/reviews/desc?page=${dataCurrentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const json = await response.json();
      setData(json);
    }
  }

  useEffect(() => {
    reviewOrderByDesc();
  }, [dataCurrentPage])

  return (
    <div>
      <h1>리뷰 최신 순</h1>
      {data?.content.map((item, idx) => (
        <Review idx={idx} item={item} />
      ))}
      <PagingComponent currentPage={data?.number} pageCount={data?.totalPages} onPageChange={onDataPageChange} />
    </div>
  )
}

export default ReviewList;