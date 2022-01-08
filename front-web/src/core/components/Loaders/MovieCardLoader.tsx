import { generateList } from '@utils/list'
import ContentLoader from 'react-content-loader'

const loaders = generateList(4)

const MovieCardLoader = () => {
  return (
    <>
      {loaders.map((loader) => (
        <ContentLoader
          key={loader}
          speed={2}
          width={270}
          height={322}
          viewBox="0 0 270 322"
          gradientRatio={0.2}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
        >
          <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
        </ContentLoader>
      ))}
    </>
  )
}

export default MovieCardLoader
