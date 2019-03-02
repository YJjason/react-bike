/**
 * +----------------------------------------------------------------------
 * | index | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React, {Component} from 'react';
import {Card, Row, Col, Modal} from "antd";
import './../ui.less'

const {Meta} = Card;

class Gallery extends Component {
    state = {
        visible: false,
    }
    handleShowPic = (imgSrc) => {
        this.setState({
            imgUrl:'/gallery/'+imgSrc,
            visible: true,
        })
    }

    render() {
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png']
        ];
        const imgList = imgs.map((list) => {
                return list.map((item, index) => {
                        return <Card key={index}
                                     style={{marginBottom: 10}}
                                     cover={<img src={'/gallery/' + item} onClick={() => this.handleShowPic(item)} alt={item} />}
                        >
                            <Meta
                                title='照片'
                                description='this is the description'
                            />
                        </Card>
                    }
                )
            }
        )

        return (
            <div>
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    title='图片详情'
                    visible={this.state.visible}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <img style={{width:'100%'}} src={this.state.imgUrl} alt=""/>
                </Modal>
            </div>
        );
    }

}

export default Gallery;
