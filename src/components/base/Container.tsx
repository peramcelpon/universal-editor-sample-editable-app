/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { ReactElement, useEffect, useState } from "react";
import { type EditableProps, ITEM_TYPE } from "src/types";
import { convertToEditorProps, createChildComponents, fetchData } from "src/utils";

type ContainerProps = Omit<EditableProps, "type">;

const Container = (props: ContainerProps): ReactElement => {
  const [components, setComponents] = useState<ReactElement[]>([]);

  const defaultProps = { type: ITEM_TYPE.CONTAINER };
  const editableProps = { ...defaultProps, ...props };
  const editorProps = convertToEditorProps(editableProps);

  const { resource } = editableProps;

  useEffect(() => {
    if (!resource) {
      return;
    }

    fetchData(resource).then((data) => {
      setComponents(createChildComponents(data[":items"], resource));
    });
  }, [resource]);

  return <div {...editorProps}>{components}</div>;
};

export { Container };
