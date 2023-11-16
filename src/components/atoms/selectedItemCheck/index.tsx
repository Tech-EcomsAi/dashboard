import React from 'react'
import styles from './selectedItemCheck.module.scss'
import { theme } from 'antd';
import { LuCheck, LuCheckCircle, LuCheckCircle2 } from 'react-icons/lu';
import { AnimatePresence, motion } from 'framer-motion';
import { TbSquareRoundedCheck, TbSquareRoundedCheckFilled } from 'react-icons/tb';
import { BiCheckDouble } from 'react-icons/bi';
import { BsCheck2Circle } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';

function SelectedItemCheck({ active }) {
    const { token } = theme.useToken();

    return (
        <>
            <AnimatePresence>
                {active ? <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.selectedItemCheck}
                    style={{ color: token.colorBgBase, background: token.colorPrimaryText }}>
                    <GiCheckMark />
                </motion.div> : <></>}
            </AnimatePresence>
        </>
    )
}

export default SelectedItemCheck