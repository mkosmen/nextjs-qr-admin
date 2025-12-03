'use client';

import { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Category,
  CategoryActionDto,
  DefaultOptions,
  PaginationLimitModel,
  PaginationModel,
} from '@/lib/types';
import {
  DEFAULT_PAGINATION_LIMITATION,
  DEFAULT_PAGINATION_MODEL,
  MODAL_ACTION_TYPE,
  PAGE_SIZE_OPTIONS,
} from '@/lib/constant';
import { ToastContext } from '@/lib/providers/ToastProvider';
import { create, getList, remove, update, updateActive } from '@/lib/services/category.service';
// ---
import { Box, Switch } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import Actions from './components/actions';
import ActionDialog from './components/actionDialog';
import DeleteDialog from './components/deleteDialog';
import NoData from '@/components/NoData';

export default function CategoryPage() {
  const t = useTranslations();
  const toast = useContext(ToastContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>(DEFAULT_PAGINATION_MODEL);
  const [limitation, setLimitation] = useState<PaginationLimitModel>(DEFAULT_PAGINATION_LIMITATION);
  const [categoryOptions, setCategoryOptions] = useState<DefaultOptions[]>();
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<MODAL_ACTION_TYPE>('create');
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionDialogKey, setActionDialogKey] = useState(1);
  const [deleteDialogKey, setDeleteDialogKey] = useState(1);

  const columns: GridColDef<(typeof categories)[number]>[] = [
    {
      field: 'name',
      flex: 1,
      headerName: t('category.name'),
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

  function handleEditClick(row: Category) {
    setSelectedCategory(row);
    setActionType('update');
    setIsActionDialogOpen(true);
  }

  function handleDeleteClick(row: Category) {
    setSelectedCategory(row);
    setIsDeleteDialogOpen(true);
  }

  async function handleChange(checked: boolean, row: Category) {
    try {
      updateCategoryOptionState({
        _id: row._id!,
        statusLoading: true,
      });

      const newCategoryState = {
        _id: row._id!,
        active: checked,
      };

      await updateActive(newCategoryState);
      updateCategoryState(newCategoryState);

      toast?.showToast(t('category.statusUpdateSuccess'));
    } catch {
      toast?.showToast(t('category.statusUpdateFailed'));
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
      } as DefaultOptions;
    });
    setCategoryOptions(categoryOptions);
  }

  function updateCategoryOptionState(options: DefaultOptions) {
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
      const result = await getList({
        params: {
          page: pagination.page + 1,
          limit: pagination.pageSize,
        },
      });

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

  async function onActionSubmit(dto: CategoryActionDto) {
    setActionLoading(true);

    try {
      if (actionType === 'create') {
        await create(dto);
        getCategories();
      } else {
        await update(selectedCategory!._id!, dto);
        updateSingleCategory(selectedCategory!._id!, dto);
      }
      setActionDialogKey((p) => p + 1);
      setIsActionDialogOpen(false);
      toast?.showToast(
        actionType === 'create' ? t('category.createSuccess') : t('category.updateSuccess'),
      );
    } catch {
      toast?.showToast(
        actionType === 'create' ? t('category.createFailed') : t('category.updateFailed'),
      );
    } finally {
      setActionLoading(false);
    }
  }

  function onCloseActionDialog() {
    setActionType('create');
    setIsActionDialogOpen(false);
    setSelectedCategory(null);
  }

  async function onDeleteSubmit() {
    setDeleteLoading(true);

    try {
      await remove(selectedCategory!._id!);

      getCategories();
      setSelectedCategory(null);
      setIsDeleteDialogOpen(false);
      setDeleteDialogKey((p) => p + 1);
      toast?.showToast(t('category.deleteSuccess'));
    } catch {
      toast?.showToast(t('category.deleteFailed'));
    } finally {
      setDeleteLoading(false);
    }
  }

  function onCloseDeleteDialog() {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  }

  function updateSingleCategory(id: string, category: any) {
    setCategories((prev) => {
      const newCategories = prev.map((m) => {
        if (id === m._id) {
          return {
            ...m,
            name: category.name,
            active: category.active,
          };
        }

        return m;
      });

      return newCategories;
    });
  }
  // ---

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <Box className="w-full">
        <div className="mb-2 flex p-1">
          <Actions
            loading={loading}
            refresh={getCategories}
            openActionDialog={() => setIsActionDialogOpen(true)}
          />
        </div>
        {categories.length ? (
          <DataGrid
            style={{ height: '423px' }}
            getRowId={(row) => row._id!}
            rows={categories}
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
        ) : (
          <NoData message={t('category.noData')} />
        )}
      </Box>

      <ActionDialog
        key={`a_${actionDialogKey}`}
        loading={actionLoading}
        setLoading={setActionLoading}
        open={isActionDialogOpen}
        type={actionType}
        onClose={onCloseActionDialog}
        onSubmit={onActionSubmit}
        category={selectedCategory}
      />

      <DeleteDialog
        key={`d_${deleteDialogKey}`}
        loading={deleteLoading}
        open={isDeleteDialogOpen}
        onClose={onCloseDeleteDialog}
        onSubmit={onDeleteSubmit}
        category={selectedCategory}
      />
    </>
  );
}
