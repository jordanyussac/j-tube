import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { Typography, Box, Stack } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import { Video, Videos, Loader } from './'
import { fetchFromAPI } from "../utils/fetchFromAPI"



const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null)

  const [videos, setVideos] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]))
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => setVideos(data.items))
  }, [id])

  if (!videoDetail?.snippet) return <Loader />

  console.log(videoDetail);

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ height: '88vh', position: 'sticky', top: '81px', overflow: 'hidden'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls playing height={50}/>
            <Typography color='#fff' variant="h6" fontWeight='bold' py={0.7} px={1}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={0.7} px={1}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} sx={{ fontSize: { xs: '10px', sm: '15px'} }} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px'}} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7, fontSize: { xs: '10px', sm: '15px'} }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7, fontSize: { xs: '10px', sm: '15px'} }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 0, xs: 0}} justifyContent='center' alignItems='center' alignContent='center'>
          <Typography variant="h6" sx={{ color: 'white'}} pb={1}>
            More Video
          </Typography>
          <Videos videos={videos} direction="column"/>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail