import React from 'react'
import AvatarEditor from 'react-avatar-editor'

class MyEditor extends React.Component {
    render() {
        return (
            <AvatarEditor
        image="https://ssl.gstatic.com/images/branding/product/1x/avatar_anonymous_square_512dp.png"
        width={100}
        height={100}
        border={0}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />
        )
    }
}

export default MyEditor
