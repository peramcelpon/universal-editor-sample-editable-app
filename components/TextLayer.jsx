import Menu from "./Menu";

const textItemLookup = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    a: "a",
    p: "p",
    span: "span",
    button: "button",
};

const isMenu = obj => {
    return obj?._model.title === "Panel Menu";
};

export default function TextLayer({data, activeMenuItem, panelNr, isInEditor}) {
    const editorReference = isInEditor && panelNr === 0 && data?._path ? { itemID: `urn:aem:${data?._path}/jcr:content/data/master`, itemType: "reference" } : null;
    const editorContainer = isInEditor && panelNr === 0 && data?._path ? { itemType: "container", itemProp: "leftBox" } : null;
    return (
        <div className={"textLayer"} id={data.id} itemScope {...editorReference}>
            {data?.column?.length ?
                <div className={`columnWrapper ${data?.textPosition || ""} ${data?.noPadding ? "noPadding" : ""}`}>
                    {data?.column?.map((item, index) => {
                        const MatchingComponent = textItemLookup[item.type] || "p";
                        return (
                            <MatchingComponent
                                key={index + data.id}
                                className={`${item.type} ${item?.styles?.join(" ")}`}
                                id={item.id}
                            >
                                {item.content?.plaintext}
                            </MatchingComponent>
                        );
                    })}
                </div> : null
            }

            {data?.leftBox?.length ?
                <div className="left" {...editorContainer}>
                    {data?.leftBox?.map((item, index) => {
                        const MatchingComponent = textItemLookup[item.type] || "p";
                        return (
                            (isInEditor && item._path === '/content/dam/sample-wknd-app/en/content-fragments/text-items/mtnBikerInCanyonTitle') ?
                                <MatchingComponent
                                    className={`${item.type} ${item?.styles?.join(" ")}`}
                                    id={item.id}
                                    key={'/content/dam/sample-wknd-app/en/content-fragments/text-items/mtnBikerInCanyonTitle'}
                                    itemScope
                                    itemID={`urn:aem:${item._path}/jcr:content/data/master`}
                                    itemType="reference"
                                    data-editor-behavior="component"
                                >
                                    <span itemProp="content" itemType="text">{item.content?.plaintext}</span>
                                </MatchingComponent>
                                :
                                <MatchingComponent
                                    key={index + data.id}
                                    className={`${item.type} ${item?.styles?.join(" ")}`}
                                    id={item.id}
                                >
                                    {item.content?.plaintext}
                                </MatchingComponent>
                        );
                    })}
                </div> : null
            }

            {
                data?.rightBox?.length ? (
                    <div className="right">
                        {data?.rightBox?.map((item, index) => {
                            const MatchingComponent = isMenu(item) ? Menu : textItemLookup[item.type] || "p";
                            return (
                                <MatchingComponent
                                    menuItems={item.menuItems}
                                    activeMenuItem={activeMenuItem}
                                    panelNr={panelNr}
                                    key={index}
                                    className={`${item.type} ${item?.styles?.join(" ")}`}
                                    id={item.id}
                                >
                                    {item.content?.plaintext}
                                </MatchingComponent>
                            );
                        })}
                    </div>) : null
            }
        </div>
    );
}
