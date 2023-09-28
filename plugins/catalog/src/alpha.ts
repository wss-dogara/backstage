/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export * from './translation';

import {
  DiscoveryApi,
  FetchApi,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';
import { CatalogClient } from '@backstage/catalog-client';
import {
  createApiExtension,
  createPlugin,
} from '@backstage/frontend-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';

/** @alpha */
export const CatalogApi = createApiExtension({
  factory: {
    api: catalogApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      fetchApi: fetchApiRef,
    },
    factory: ({
      discoveryApi,
      fetchApi,
    }: {
      discoveryApi: DiscoveryApi;
      fetchApi: FetchApi;
    }) => new CatalogClient({ discoveryApi, fetchApi }),
  },
});

/** @alpha */
export default createPlugin({
  id: 'catalog',
  extensions: [CatalogApi],
});