'use client';

import { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Category,
  CategoryOptions,
  PaginationLimitModel,
  PaginationModel,
  PaginationResult,
} from '@/lib/types';
import { patchApi, postApi } from '@/lib/utils';
import {
  DEFAULT_PAGINATION_LIMITATION,
  DEFAULT_PAGINATION_MODEL,
  LINKS,
  PAGE_SIZE_OPTIONS,
} from '@/lib/constant';
import { ToastContext } from '@/lib/providers/ToastProvider';
// ---
import { Box, Button, Switch } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
} from '@mui/x-data-grid';
import { Delete, Edit, Refresh } from '@mui/icons-material';

export default function CategoryPage() {
  const t = useTranslations();
  const toast = useContext(ToastContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>(DEFAULT_PAGINATION_MODEL);
  const [limitation, setLimitation] = useState<PaginationLimitModel>(DEFAULT_PAGINATION_LIMITATION);
  const [categoryOptions, setCategoryOptions] = useState<CategoryOptions[]>();

  const columns: GridColDef<(typeof categories)[number]>[] = [
    {
      field: 'name',
      flex: 1,
      headerName: t('categoryName'),
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: 'active',
      headerName: t('status'),
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell(params: GridRenderCellParams<any, boolean>) {
        const option = categoryOptions?.find((f) => f._id === params.row._id);
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
      getActions({ id }) {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label={t('edit')}
            title={t('edit')}
            key="edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="primary"
          />,
          <GridActionsCellItem
            className="!text-red-900"
            icon={<Delete />}
            title={t('delete')}
            label={t('delete')}
            key="delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function handleEditClick(id: GridRowId) {
    console.log('handleEditClick', id);
  }

  function handleDeleteClick(id: GridRowId) {
    console.log('handleDeleteClick', id);
  }

  async function handleChange(checked: boolean, row: Category) {
    try {
      updateCategoryOptionState({
        _id: row._id!,
        statusLoading: true,
      });

      const newCategoryState = {
        _id: row._id,
        active: checked,
      };

      await patchApi(LINKS.API_ROUTE.CATEGORY.STATUS, {
        replace: {
          _id: row._id,
        },
        body: JSON.stringify(newCategoryState),
      });

      updateCategoryState(newCategoryState);
      toast?.showToast(t('categoryStatusUpdateSuccess'));
    } catch {
      toast?.showToast(t('categoryStatusUpdateFailed'));
    } finally {
      updateCategoryOptionState({
        _id: row._id!,
        statusLoading: false,
      });
    }
  }

  function fillCategoryOptions(categories: Category[]) {
    const categoryOptions = categories.map((m) => {
      return {
        _id: m._id,
        statusLoading: false,
      } as CategoryOptions;
    });
    setCategoryOptions(categoryOptions);
  }

  function updateCategoryOptionState(options: CategoryOptions) {
    const categoryOption = categoryOptions?.find((f) => f._id === options._id);
    if (!categoryOption) {
      return;
    }

    setCategoryOptions((prev) => {
      const newResult = prev?.map((m) => {
        if (m._id === categoryOption._id) {
          return {
            ...categoryOption,
            ...options,
          };
        }

        return categoryOption;
      });

      return newResult;
    });
  }

  function updateCategoryState(category: Partial<Category>) {
    setCategories((prev) => {
      const newList = prev.map((m) => {
        if (m._id === category._id) {
          return {
            ...m,
            ...category,
          };
        }

        return m;
      });

      return newList;
    });
  }

  const getCategories = useCallback(async () => {
    setLoading(true);

    try {
      const result = await postApi<PaginationResult<{ categories: Category[] }>>(
        LINKS.API_ROUTE.CATEGORY._DEFAULT,
        {
          body: JSON.stringify({
            params: {
              page: pagination.page + 1,
              limit: pagination.pageSize,
            },
          }),
        },
      );

      setCategories(result.categories);
      setPagination((prev) => ({
        ...prev,
        pageSize: result.pagination.limit,
      }));
      setLimitation((prev) => ({
        ...prev,
        maxPage: result.pagination.maxPage,
        total: result.pagination.total,
      }));
      fillCategoryOptions(result.categories);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);
  // ---

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Box className="w-full">
      <div className="mb-2 flex justify-end p-1">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<Refresh />}
          loading={loading}
          onClick={getCategories}
        >
          {t('refresh')}
        </Button>
      </div>
      <DataGrid
        getRowId={(row) => row._id!}
        rows={categories}
        columns={columns}
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        paginationModel={pagination}
        onPaginationModelChange={setPagination}
        rowCount={limitation.total}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        paginationMode="server"
      />
    </Box>
  );
}
