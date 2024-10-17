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
import { type ReactElement, useMemo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getAuthorHost, getPath } from "src/utils";
import { Container } from "src/components";
import "./App.css";

const App = (): ReactElement => {
  const path = useMemo(() => getPath(), [])

  return (
  <HelmetProvider>
    <Helmet>
      <meta name="urn:adobe:aue:system:aemconnection" content={`aem:${getAuthorHost()}`} />
    </Helmet>
      <Container 
        resource={`urn:aemconnection:${path}`}
        label="container"
      />
  </HelmetProvider>
)};

export default App;
