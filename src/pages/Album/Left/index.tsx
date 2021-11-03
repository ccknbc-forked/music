/**
 * 左边
 */
import React, { useState, useEffect, useCallback, memo } from 'react'
import Comment from 'common/Comment'
import _getComment, { cancelGetComment } from 'network/comment'

interface IProps {
    id: string
}

function Left(props: IProps) {
    const { id } = props

    const [commentHot, setCommentHot] = useState<{ [propName: string]: any } | null>(null)
    const [comment, setComment] = useState<{ [propName: string]: any }>({})

    useEffect(() => {
        if (id) {
            getCommentHot()
        }

        async function getCommentHot() {
            const res: any = await _getComment(id, 3)

            try {
                setCommentHot(res.data)
                getComment()
            } catch (e) {

            }
        }

        async function getComment() {

            const res: any = await _getComment(id, 3, 3, 1, 20)

            try {
                setComment(res.data)
            } catch (e) {

            }
        }

        return () => {
            cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()
        }
    }, [id])

    // 发最新评论请求的方法，需要传给Comment组件
    const getComment = useCallback((page: string | number = 0) => {
        const { cursor } = comment ?? {}

        cancelGetComment.cancelGetComment && cancelGetComment.cancelGetComment()

        _getComment(id, 3, 3, Number(page) + 1, 20, cursor).then(res => {
            try {
                setComment(res.data)
            } catch (e) {

            }
        })

    }, [id, comment])

    return (
        <div className='album-left'>
            <div className='g-wrap6'>
                {/* 评论 */}
                <Comment commentHot={commentHot} comment={comment} callback={getComment} />
            </div>
        </div>
    )
}

export default memo(Left)