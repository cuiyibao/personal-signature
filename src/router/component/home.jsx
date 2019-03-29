import React, { Component } from "react"
import { connect } from "react-redux"
import { list, add, del } from "../../store/actions"
import "./home.css"
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canvasHeight: 300,
      canvasWidth: 400
    }
  }

  componentDidMount() {
    this.setState({
      canvasHeight: document.body.clientHeight - 48,
      canvasWidth: document.body.clientWidth
    })

    // 初始化画布
    let cxt = this.canvas.getContext("2d")
    this.setState({ cxt: cxt }, () => {
      this.drawLine()
    })
  }

  // 判断浏览器是否支持canvas
  isCanvasSupported() {
    let elem = document.createElement("canvas")
    return !!(elem.getContext && elem.getContext("2d"))
  }

  // 画图
  drawLine() {
    const cxt = this.state.cxt
    cxt.beginPath()
    cxt.lineWidth = 5
    cxt.strokeStyle = "#000"
    cxt.moveTo(100, 100)
    cxt.lineTo(150, 100)
    cxt.lineJoin = 'round';
    // 绘制已定义的路径
    cxt.stroke()
  }

  render() {
    const { canvasHeight, canvasWidth } = this.state

    return (
      <div className="home-wrapper">
        {this.isCanvasSupported() ? (
          <canvas
            ref={canvas => (this.canvas = canvas)}
            height={canvasHeight}
            width={canvasWidth}
          />
        ) : (
          <span>对不起，当前浏览器暂不支持此功能！</span>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    list: state.list
  }
}

export default connect(
  mapStateToProps,
  { add, del }
)(Home)
