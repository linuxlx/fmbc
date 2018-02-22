import React, { PureComponent } from 'react';
import styles from './index.less';

class GameDetailExplain extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  render() {
    const {
      exampleDescript,
      playNameDescription,
      title,
    } = this.props;

    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <h2>{title}</h2>
          <h3>{exampleDescript && exampleDescript}</h3>
          {
            playNameDescription && playNameDescription.map((item, key) => {
              return (
                <div key={key}>
                  <h4>{item.name}</h4>
                  {
                    item.detail.map((value, kkey) => {
                      return (
                        <p key={kkey}>{value}</p>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default GameDetailExplain;
