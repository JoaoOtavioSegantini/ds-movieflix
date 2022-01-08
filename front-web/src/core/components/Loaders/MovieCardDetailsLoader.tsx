import ContentLoader from 'react-content-loader'

const MovieCardDetailsLoader = () => (
  <ContentLoader
    speed={2}
    width={1170}
    height={374}
    viewBox="0 0 1170 374"
    gradientRatio={0.2}
    backgroundColor={'#333'}
    foregroundColor={'#999'}
  >
    <rect x="0" y="60" rx="2" ry="2" width="1170" height="400" />
  </ContentLoader>
)

export default MovieCardDetailsLoader
