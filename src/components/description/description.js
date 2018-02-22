import React from 'react';
import styles from './description.less';

const Description = ({ descriptionData }) => {
  return (
    <div className={styles['description-wrap']}>
      <div
        className={styles.description}
        style={{ height: document.documentElement.clientHeight * 0.7 }}
      >
        {
                  descriptionData.map((item, index) => {
                    const { title, children } = item;
                    return (<div key={index} className={styles['description-item']}>
                      <span className={styles['description-item-title']}>
                        {title}<br />
                      </span>
                      <p className={styles['description-item-detail']}>
                        {children.map((content) => {
                          return content.text
                        },
                        )}
                      </p>
                    </div>)
                  })
              }
      </div>
    </div>
  )
}

export default Description;
