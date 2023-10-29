import React, { Fragment, useEffect, useState } from "react";
import { LuHistory, LuUploadCloud } from "react-icons/lu";
import { fabric } from "fabric";
import styles from "./myStuff.module.scss";
import { theme, Tooltip } from "antd";
import { activeObjectsState } from "@template/craftBuilder/types";
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from "@atoms/segment";
import { RECENT_ITEMS_LIST } from "@constant/recentItems";
import Saperator from "@atoms/Saperator";
import { TbX } from "react-icons/tb";
import { ICONS_CATEGORY_LIST } from "src/data/reactIcons";
import ReactIconRenderer from '@template/craftBuilder/tabsComposer/graphics/reactIconRenderer'

const TAB_TYPES = {
  RECENT: 'Recent',
  UPLOADED: 'Uploaded',
}

const FILL_TYPE_ITEMS_LIST = [
  { key: TAB_TYPES.RECENT, value: TAB_TYPES.RECENT, icon: <LuHistory /> },
  { key: TAB_TYPES.UPLOADED, value: TAB_TYPES.UPLOADED, icon: <LuUploadCloud /> },
]


type pageProps = {
  updateLocalCanvas: any
  canvas: fabric.Canvas,
  activeObjectsState: activeObjectsState,
  workspace: fabric.Rect
}

function MyStuff({ canvas, updateLocalCanvas, workspace, activeObjectsState }: pageProps) {

  const { token } = theme.useToken();
  const [activeTab, setActiveTab] = useState(TAB_TYPES.RECENT);
  const [recentItemsList, setSecentItemsList] = useState([RECENT_ITEMS_LIST])

  useEffect(() => {
    if (window) {
      let recentItems = localStorage.getItem('recents') ? JSON.parse(localStorage.getItem('recents')) : RECENT_ITEMS_LIST;
      setSecentItemsList(recentItems || RECENT_ITEMS_LIST);
    }
  }, [])

  const onSelectIcon = (category, Icon) => {

  }

  return <div className={styles.myStuffWrap}>
    <SegmentComponent
      label={``}
      value={activeTab}
      showIcon={true}
      onChange={(tab) => setActiveTab(tab)}
      options={FILL_TYPE_ITEMS_LIST}
      type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
    />

    <div className={styles.tabsContent}>
      {activeTab == TAB_TYPES.RECENT ? <>
        <div className={styles.contentWrap}>
          <div className={styles.subHeading}>Your recently used assets</div>
          <div className={styles.typesWrap}>
            {recentItemsList.map((typeDetails: any, ti: number) => {
              return <Fragment key={ti}>
                {typeDetails.items?.length != 0 && <>
                  <div className={styles.typesItemsWrap}>
                    <div className={styles.subHeading}>{typeDetails.type}</div>

                    {/* //images items */}
                    {typeDetails.type == 'Images' && <>
                      <div className={styles.imagesListWrap}>
                        {typeDetails.items.map((item: any, i: number) => {
                          return <Fragment key={i}>
                            <div className={`${styles.imageWrap} ${styles.itemWrap}`}>
                              <div className={styles.deleteIcon}>
                                <Tooltip title="Delete image from recent">
                                  <TbX />
                                </Tooltip>
                              </div>
                              <img src={item} />
                            </div>
                          </Fragment>
                        })}
                      </div>
                    </>}

                    {/* //icons items */}
                    {typeDetails.type == 'Icons' && <>
                      <div className={styles.imagesListWrap}>
                        {typeDetails.items.map((item: any, i: number) => {
                          const catIndex = ICONS_CATEGORY_LIST.findIndex((c: any) => c.id == item.category);
                          const Icon = ICONS_CATEGORY_LIST[catIndex].icons.find((i) => i.name == item.name)
                          return <Fragment key={i}>
                            {Boolean(Icon) && <div className={`${styles.imageWrap} ${styles.itemWrap}`}>
                              <div className={styles.deleteIcon}>
                                <Tooltip title="Delete image from recent">
                                  <TbX />
                                </Tooltip>
                              </div>
                              <ReactIconRenderer viewType="large" key={i} iconDetails={Icon} onSelect={() => onSelectIcon(item.category, Icon.icon)} />
                            </div>}
                          </Fragment>
                        })}
                      </div>
                    </>}

                    {/* //colors items */}
                    {typeDetails.type == 'Colors' && <>
                      <div className={styles.colorsWrap}>
                        {typeDetails.items.map((item: any, i: number) => {
                          return <Fragment key={i}>
                            <div className={`${styles.color} ${styles.itemWrap}`} key={i} style={{ background: item }}>
                              <div className={styles.deleteIcon}>
                                <Tooltip title="Delete color from recent">
                                  <TbX />
                                </Tooltip>
                              </div>
                            </div>
                          </Fragment>
                        })}
                      </div>
                    </>}

                  </div>
                  <Saperator />
                </>}
              </Fragment>
            })}
          </div>
        </div>

      </> : <>
        <div className={styles.contentWrap}>
          <div className={styles.subHeading}>Your previously uploaded assets</div>

        </div>
      </>}
    </div>

  </div>;
}

export default MyStuff;
