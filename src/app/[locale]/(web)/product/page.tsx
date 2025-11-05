'use client';

import { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Product,
  PaginationLimitModel,
  PaginationModel,
  PaginationResult,
  DefaultOptions,
  Category,
} from '@/lib/types';
import { deleteApi, getApi, patchApi, postApi, putApi } from '@/lib/utils';
import {
  DEFAULT_PAGINATION_LIMITATION,
  DEFAULT_PAGINATION_MODEL,
  LINKS,
  MODAL_ACTION_TYPE,
  PAGE_SIZE_OPTIONS,
} from '@/lib/constant';
import { ToastContext } from '@/lib/providers/ToastProvider';
// ---
import { Box, Chip, Switch } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  useGridApiRef,
} from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import Actions from './components/actions';
import ActionDialog from './components/actionDialog';
import DeleteDialog from './components/deleteDialog';

export default function ProductPage() {
  const t = useTranslations();
  const toast = useContext(ToastContext);
  const apiRef = useGridApiRef();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>(DEFAULT_PAGINATION_MODEL);
  const [limitation, setLimitation] = useState<PaginationLimitModel>(DEFAULT_PAGINATION_LIMITATION);
  const [productOptions, setProductOptions] = useState<DefaultOptions[]>();
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<MODAL_ACTION_TYPE>('create');
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionDialogKey, setActionDialogKey] = useState(1);
  const [deleteDialogKey, setDeleteDialogKey] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const columns: GridColDef<(typeof products)[number]>[] = [
    {
      field: 'name',
      flex: 1,
      headerName: t('product.name'),
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: 'categoryId',
      flex: 1,
      headerName: t('category.name'),
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell(params: GridRenderCellParams<any, string>) {
        const category = categories.find((f) => f._id === params.value);
        return <Chip label={category?.name || '-'} size="small" />;
      },
    },
    {
      field: 'active',
      headerName: t('status'),
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell(params: GridRenderCellParams<any, boolean>) {
        const option = productOptions?.find((f) => f._id === params.row._id);
        return (
          <Switch
            checked={params.value}
            disabled={option?.statusLoading}
            onChange={(e, c) => handleChange(c, params.row)}
            slotProps={{ input: { 'aria-label': 'controlled' } }}
          />
        );
      },
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      cellClassName: 'actions',
      headerName: t('actions'),
      filterable: false,
      sortable: false,
      hideable: false,
      headerAlign: 'right',
      getActions({ row }: any) {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label={t('edit')}
            title={t('edit')}
            key="edit"
            className="textPrimary"
            onClick={() => handleEditClick(row)}
            color="primary"
          />,
          <GridActionsCellItem
            className="!text-red-900"
            icon={<Delete />}
            title={t('delete')}
            label={t('delete')}
            key="delete"
            onClick={() => handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function handleEditClick(row: Product) {
    setSelectedProduct(row);
    setActionType('update');
    setIsActionDialogOpen(true);
  }

  function handleDeleteClick(row: Product) {
    setSelectedProduct(row);
    setIsDeleteDialogOpen(true);
  }

  async function handleChange(checked: boolean, row: Product) {
    try {
      updateProductOptionState({
        _id: row._id!,
        statusLoading: true,
      });

      const newProductState = {
        _id: row._id,
        active: checked,
      };

      await patchApi(LINKS.API_ROUTE.PRODUCT.STATUS, {
        replace: {
          _id: row._id,
        },
        body: JSON.stringify(newProductState),
      });

      updateProductState(newProductState);
      toast?.showToast(t('product.statusUpdateSuccess'));
    } catch {
      toast?.showToast(t('product.statusUpdateFailed'));
    } finally {
      updateProductOptionState({
        _id: row._id!,
        statusLoading: false,
      });
    }
  }

  function fillProductOptions(products: Product[]) {
    const productOptions = products.map((m) => {
      return {
        _id: m._id,
        statusLoading: false,
      } as DefaultOptions;
    });
    setProductOptions(productOptions);
  }

  function updateProductOptionState(options: DefaultOptions) {
    const productOption = productOptions?.find((f) => f._id === options._id);
    if (!productOption) {
      return;
    }

    setProductOptions((prev) => {
      const newResult = prev?.map((m) => {
        if (m._id === productOption._id) {
          return {
            ...productOption,
            ...options,
          };
        }

        return productOption;
      });

      return newResult;
    });
  }

  function updateProductState(product: Partial<Product>) {
    setProducts((prev) => {
      const newList = prev.map((m) => {
        if (m._id === product._id) {
          return {
            ...m,
            ...product,
          };
        }

        return m;
      });

      return newList;
    });
  }

  const getProducts = useCallback(async () => {
    setLoading(true);

    try {
      const result = await getApi<PaginationResult<{ products: Product[] }>>(
        LINKS.API_ROUTE.PRODUCT._DEFAULT,
        {
          params: {
            page: pagination.page + 1,
            limit: pagination.pageSize,
          },
        },
      );

      setProducts(result.products);
      setPagination((prev) => ({
        ...prev,
        pageSize: result.pagination.limit,
      }));
      setLimitation((prev) => ({
        ...prev,
        maxPage: result.pagination.maxPage,
        total: result.pagination.total,
      }));
      fillProductOptions(result.products);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);

  async function onActionSubmit(dto: Product) {
    setActionLoading(true);

    try {
      if (actionType === 'create') {
        await postApi(LINKS.API_ROUTE.PRODUCT._DEFAULT, { body: JSON.stringify(dto) });
        getProducts();
      } else {
        await putApi(LINKS.API_ROUTE.PRODUCT.SINGLE, {
          replace: {
            _id: selectedProduct?._id,
          },
          body: JSON.stringify(dto),
        });
        updateSingleProduct(selectedProduct!._id!, dto);
      }
      setActionDialogKey((p) => p + 1);
      setIsActionDialogOpen(false);
      toast?.showToast(
        actionType === 'create' ? t('product.createSuccess') : t('product.updateSuccess'),
      );
    } catch {
      toast?.showToast(
        actionType === 'create' ? t('product.createFailed') : t('product.updateFailed'),
      );
    } finally {
      setActionLoading(false);
    }
  }

  function onCloseActionDialog() {
    setActionType('create');
    setIsActionDialogOpen(false);
    setSelectedProduct(null);
  }

  async function onDeleteSubmit() {
    setDeleteLoading(true);

    try {
      await deleteApi(LINKS.API_ROUTE.PRODUCT.SINGLE, {
        replace: { _id: selectedProduct?._id },
      });
      getProducts();
      setSelectedProduct(null);
      setIsDeleteDialogOpen(false);
      setDeleteDialogKey((p) => p + 1);
      toast?.showToast(t('product.deleteSuccess'));
    } catch {
      toast?.showToast(t('product.deleteFailed'));
    } finally {
      setDeleteLoading(false);
    }
  }

  function onCloseDeleteDialog() {
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  }

  function updateSingleProduct(id: string, product: Product) {
    setProducts((prev) => {
      const newProducts = prev.map((m) => {
        if (id === m._id) {
          return {
            ...m,
            name: product.name,
            categoryId: product.categoryId,
            active: product.active,
          };
        }

        return m;
      });

      return newProducts;
    });
  }

  async function getCategories() {
    try {
      const result = await getApi<Category[]>(LINKS.API_ROUTE.CATEGORY.ALL);
      setCategories(result);
    } finally {
    }
  }

  const init = useCallback(async () => {
    getProducts();
    getCategories();
  }, [getProducts]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <Box className="w-full">
        <div className="mb-2 flex p-1">
          <Actions
            loading={loading}
            refresh={init}
            openActionDialog={() => setIsActionDialogOpen(true)}
          />
        </div>
        <DataGrid
          style={{ height: '423px' }}
          apiRef={apiRef}
          getRowId={(row) => row._id!}
          rows={products}
          columns={columns}
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          paginationModel={pagination}
          onPaginationModelChange={setPagination}
          rowCount={limitation.total}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          paginationMode="server"
        />
      </Box>

      <ActionDialog
        key={`a_${actionDialogKey}`}
        loading={actionLoading}
        setLoading={setActionLoading}
        open={isActionDialogOpen}
        type={actionType}
        onClose={onCloseActionDialog}
        onSubmit={onActionSubmit}
        product={selectedProduct}
        categories={categories}
      />

      <DeleteDialog
        key={`d_${deleteDialogKey}`}
        loading={deleteLoading}
        open={isDeleteDialogOpen}
        onClose={onCloseDeleteDialog}
        onSubmit={onDeleteSubmit}
        product={selectedProduct}
      />
    </>
  );
}
